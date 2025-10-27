<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <div
              class="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg"
            >
              <TicketIcon class="w-6 h-6 text-white" />
            </div>
            <span
              class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              TicketFlow
            </span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-4">
            <span class="text-gray-700 font-medium">
              Welcome, {{ user?.name || "Guest" }}
            </span>
            <button
              @click="onLogout"
              class="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 transform text-white cursor-pointer"
            >
              <LogOutIcon size="16" />
              Logout
            </button>
          </div>

          <!-- Mobile Toggle -->
          <button
            class="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            @click="toggleMenu"
          >
            <component
              :is="isOpen ? XIcon : MenuIcon"
              class="w-6 h-6 text-gray-700"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <transition name="slide">
        <div
          v-if="isOpen"
          class="md:hidden border-t border-gray-100 bg-white px-4 pb-4"
        >
          <div class="flex flex-col gap-3 pt-3">
            <span class="text-gray-700 font-medium">
              Welcome, {{ user?.name || "Guest" }}
            </span>
            <button
              @click="onLogout"
              class="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 transform text-white cursor-pointer"
            >
              <LogOutIcon size="16" />
              Logout
            </button>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main Dashboard -->
    <main class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-4xl font-bold text-gray-800 mb-8">Dashboard</h2>

      <!-- Stats Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          class="bg-white rounded-2xl shadow-lg p-6"
          v-for="(card, index) in statCards"
          :key="index"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">{{ card.label }}</p>
              <p class="text-3xl font-bold" :class="card.color">
                {{ card.value }}
              </p>
            </div>
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center"
              :class="card.bg"
            >
              <component :is="card.icon" :class="card.iconColor" size="24" />
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h3 class="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h3>
        <button
          @click="() => onNavigate('tickets')"
          class="w-full md:w-auto px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform font-semibold cursor-pointer"
        >
          Manage Tickets
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="tickets.length === 0" class="text-center text-gray-500 mt-6">
        No tickets yet. Click below to create or manage tickets.
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Footer from "./Footer.vue";
import {
  LogOutIcon,
  CheckSquareIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TicketIcon,
  MenuIcon,
  XIcon,
} from "lucide-vue-next";

const props = defineProps({
  onNavigate: Function,
  onLogout: Function,
  user: Object,
});

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

const tickets = ref([]);

onMounted(() => {
  const stored = localStorage.getItem("tickets");
  if (stored) tickets.value = JSON.parse(stored);
});

const stats = computed(() => ({
  total: tickets.value.length,
  open: tickets.value.filter((t) => t.status === "open").length,
  inProgress: tickets.value.filter((t) => t.status === "in_progress").length,
  closed: tickets.value.filter((t) => t.status === "closed").length,
}));

const statCards = computed(() => [
  {
    label: "Total Tickets",
    value: stats.value.total,
    color: "text-gray-800",
    bg: "bg-blue-100",
    icon: CheckSquareIcon,
    iconColor: "text-blue-600",
  },
  {
    label: "Open Tickets",
    value: stats.value.open,
    color: "text-green-600",
    bg: "bg-green-100",
    icon: CheckCircleIcon,
    iconColor: "text-green-600",
  },
  {
    label: "In Progress",
    value: stats.value.inProgress,
    color: "text-amber-600",
    bg: "bg-amber-100",
    icon: ClockIcon,
    iconColor: "text-amber-600",
  },
  {
    label: "Resolved",
    value: stats.value.closed,
    color: "text-gray-600",
    bg: "bg-gray-100",
    icon: XCircleIcon,
    iconColor: "text-gray-600",
  },
]);
</script>
