<template>
  <div>
    <LandingPage v-if="currentPage === 'landing'" @navigate="navigate" />

    <AuthPage
      v-if="currentPage === 'login'"
      mode="login"
      @navigate="navigate"
      @auth="handleAuth"
    />

    <AuthPage
      v-if="currentPage === 'signup'"
      mode="signup"
      @navigate="navigate"
      @auth="handleAuth"
    />

    <Dashboard
      v-if="currentPage === 'dashboard'"
      :user="user"
      @navigate="navigate"
      @logout="handleLogout"
    />

    <TicketManagement
      v-if="currentPage === 'tickets'"
      :user="user"
      @navigate="navigate"
      @logout="handleLogout"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import LandingPage from "./components/LandingPage.vue";
import AuthPage from "./components/AuthPage.vue";
import Dashboard from "./components/Dashboard.vue";
import TicketManagement from "./components/TicketManagement.vue";
import { getSession, clearSession } from "./utils/auth";

const currentPage = ref("landing");
const user = ref(null);

// When app loads
onMounted(() => {
  const session = getSession();
  if (session) {
    user.value = session.user;
    if (
      currentPage.value === "landing" ||
      currentPage.value === "login" ||
      currentPage.value === "signup"
    ) {
      currentPage.value = "dashboard";
    }
  }
});

// Reactively watch current page changes
watch(currentPage, () => {
  const session = getSession();
  if (session) {
    user.value = session.user;
  }
});

function handleAuth() {
  const session = getSession();
  if (session) {
    user.value = session.user;
    currentPage.value = "dashboard";
  }
}

function handleLogout() {
  clearSession();
  user.value = null;
  currentPage.value = "login";
}

function navigate(page) {
  const session = getSession();
  if ((page === "dashboard" || page === "tickets") && !session) {
    currentPage.value = "login";
  } else {
    currentPage.value = page;
  }
}
</script>
