<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- Main Container -->
    <div class="max-w-[1440px] mx-auto">
      <!-- Navigation -->
      <nav class="flex items-center justify-between px-4 py-4 md:px-12 md:py-6">
        <div class="flex items-center gap-2">
          <div
            class="bg-linear-to-br from-blue-600 to-purple-600 p-1.5 md:p-2 rounded-lg"
          >
            <Ticket class="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span
            class="text-xl md:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            TicketFlow
          </span>
        </div>
        <div class="flex gap-2 md:gap-3">
          <button
            class="px-3 py-2 md:px-6 text-sm md:text-base text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer"
            @click="navigate('login')"
          >
            Login
          </button>
          <button
            class="px-3 py-2 md:px-6 text-sm md:text-base bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform cursor-pointer"
            @click="navigate('signup')"
          >
            Get Started
          </button>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="relative px-6 py-20 md:px-12 md:py-32 overflow-hidden">
        <!-- Wavy Background -->
        <div class="absolute inset-0 z-0">
          <svg
            class="absolute bottom-0 w-full h-64 md:h-96"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#gradient)"
              fill-opacity="0.3"
              d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,90.7C672,75,768,85,864,106.7C960,128,1056,160,1152,154.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L0,320Z"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <!-- Decorative Circles -->
        <div
          class="absolute top-20 right-10 w-64 h-64 bg-linear-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-10 left-10 w-48 h-48 bg-linear-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>

        <!-- Hero Content -->
        <div class="relative z-10 max-w-4xl mx-auto text-center">
          <div class="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
            <span class="text-blue-600 font-semibold text-sm">
              🎫 Next-Gen Ticket Management
            </span>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span
              class="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Streamline Your
            </span>
            <br />
            <span class="text-gray-800">Support Workflow</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Manage, track, and resolve customer tickets with lightning speed.
            Transform chaos into clarity with TicketFlow.
          </p>
          <div class="flex justify-center items-center">
            <button
              class="group px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform flex items-center gap-2 cursor-pointer"
              @click="navigate('signup')"
            >
              Get Started Free
              <ArrowRight
                class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="px-6 py-20 md:px-12">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Powerful Features
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to deliver exceptional customer support
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, idx) in features"
            :key="idx"
            class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
          >
            <div
              :class="`inline-block p-3 bg-linear-to-br ${feature.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`"
            >
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-800">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import Footer from "./Footer.vue";
import { Ticket, CheckCircle, ArrowRight, Clock } from "lucide-vue-next";
import { defineProps } from "vue";

const props = defineProps({
  onNavigate: Function,
});

const navigate = (page) => {
  if (props.onNavigate) props.onNavigate(page);
};

const features = [
  {
    icon: CheckCircle,
    title: "Complete Control",
    description:
      "Full CRUD operations with powerful filtering and search capabilities for maximum productivity.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Ticket,
    title: "Easy Management",
    description:
      "Create, edit, and track tickets with our intuitive interface. Everything you need in one place.",
    color: "from-indigo-400 to-purple-500",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description:
      "Stay informed with instant notifications and live status updates on all your tickets.",
    color: "from-red-400 to-rose-500",
  },
];
</script>
