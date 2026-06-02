import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { ENV } from "./_core/env";
import { getUserByEmail, createUser, getAllUsers, getUserById, updateUser, deleteUser, getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, getModulesByCourseId, getModuleById, createModule, updateModule, deleteModule, getLessonsByModuleId, getLessonById, createLesson, updateLesson, deleteLesson, completeLesson, getUserProgress, getUserStats, initializeUserStats, addXP, incrementLessonsCompleted, getAllBadges, getUserBadges, checkAndAwardBadges, getLeaderboard, getCourseProgress, getUserRank, checkAndUpdateStreak } from "./db";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(async ({ input, ctx }) => {
        const user = await getUserByEmail(input.email);
        
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(input.password, user.password);
        
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Create JWT token with required fields for session
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");
        const token = await new SignJWT({ 
          userId: user.id, 
          openId: user.openId,
          appId: ENV.appId,
          name: user.name || "User"
        })
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime("7d")
          .sign(secret);

        // Set cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      }),

    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
      }))
      .mutation(async ({ input }) => {
        const existing = await getUserByEmail(input.email);
        
        if (existing) {
          throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        const openId = `local-${nanoid()}`;

        const user = await createUser({
          openId,
          email: input.email,
          password: hashedPassword,
          name: input.name,
          role: "user",
        });

        return {
          success: true,
          user: {
            id: user?.id,
            email: user?.email,
            name: user?.name,
          },
        };
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),

    updateProfile: publicProcedure
      .input(z.object({
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new Error("Not authenticated");
        }

        const updatedUser = await updateUser(ctx.user.id, {
          name: input.name,
          email: input.email,
        });

        return {
          success: true,
          user: updatedUser,
        };
      }),
  }),

  users: router({
    list: publicProcedure.query(async () => {
      return getAllUsers();
    }),

    create: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
        role: z.enum(["user", "admin"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const existing = await getUserByEmail(input.email);
        
        if (existing) {
          throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        const openId = `local-${nanoid()}`;

        const user = await createUser({
          openId,
          email: input.email,
          password: hashedPassword,
          name: input.name,
          role: input.role || "user",
        });

        return { success: true, user };
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        role: z.enum(["user", "admin"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const user = await updateUser(id, data);
        return { success: true, user };
      }),

    delete: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        await deleteUser(input.id);
        return { success: true };
      }),
  }),

  courses: router({
    list: publicProcedure.query(async () => {
      return getAllCourses();
    }),
    
    listWithStats: publicProcedure.query(async () => {
      const courses = await getAllCourses();
      const coursesWithStats = await Promise.all(
        courses.map(async (course) => {
          const modules = await getModulesByCourseId(course.id);
          const lessonsPromises = modules.map(m => getLessonsByModuleId(m.id));
          const lessonsArrays = await Promise.all(lessonsPromises);
          const totalLessons = lessonsArrays.reduce((sum, lessons) => sum + lessons.length, 0);
          
          return {
            ...course,
            moduleCount: modules.length,
            lessonCount: totalLessons,
          };
        })
      );
      return coursesWithStats;
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getCourseById(input.id);
      }),

    create: publicProcedure
      .input(z.object({
        title: z.string().min(3),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
        duration: z.number().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createCourse(input);
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(3).optional(),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
        duration: z.number().optional(),
        order: z.number().optional(),
        isPublished: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateCourse(id, data);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteCourse(input.id);
      }),
  }),

  modules: router({
    listByCourse: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return getModulesByCourseId(input.courseId);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getModuleById(input.id);
      }),

    create: publicProcedure
      .input(z.object({
        courseId: z.number(),
        title: z.string().min(3),
        description: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createModule(input);
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(3).optional(),
        description: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateModule(id, data);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteModule(input.id);
      }),
  }),

  lessons: router({
    listByModule: publicProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input }) => {
        return getLessonsByModuleId(input.moduleId);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getLessonById(input.id);
      }),

    create: publicProcedure
      .input(z.object({
        moduleId: z.number(),
        title: z.string().min(3),
        content: z.string().optional(),
        videoUrl: z.string().optional(),
        duration: z.number().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createLesson(input);
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(3).optional(),
        content: z.string().optional(),
        videoUrl: z.string().optional(),
        duration: z.number().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateLesson(id, data);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteLesson(input.id);
      }),
  }),

  // Progress & XP System
  progress: router({
    completeLesson: protectedProcedure
      .input(z.object({ lessonId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        
        // Initialize stats if needed
        await initializeUserStats(ctx.user.id);
        
        // Mark lesson as complete
        await completeLesson(ctx.user.id, input.lessonId);
        
        // Add XP (50 XP per lesson)
        await addXP(ctx.user.id, 50);
        
        // Increment lessons completed counter
        await incrementLessonsCompleted(ctx.user.id);
        
        // Check and update streak
        const streakInfo = await checkAndUpdateStreak(ctx.user.id);
        
        // Check and award badges
        const newBadges = await checkAndAwardBadges(ctx.user.id);
        
        return { success: true, newBadges, streakInfo };
      }),

    getUserProgress: publicProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) return [];
        return getUserProgress(ctx.user.id);
      }),

    getUserStats: publicProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) return null;
        let stats = await getUserStats(ctx.user.id);
        if (!stats) {
          await initializeUserStats(ctx.user.id);
          stats = await getUserStats(ctx.user.id);
        }
        return stats;
      }),

    getCourseProgress: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user) return null;
        return getCourseProgress(ctx.user.id, input.courseId);
      }),

    getUserRank: publicProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) return null;
        return getUserRank(ctx.user.id);
      }),
  }),

  badges: router({
    getAll: publicProcedure
      .query(async () => {
        return getAllBadges();
      }),

    getUserBadges: publicProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) return [];
        return getUserBadges(ctx.user.id);
      }),
  }),

  leaderboard: router({
    getTop: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return getLeaderboard(input.limit || 10);
      }),
  }),
});

export type AppRouter = typeof appRouter;
