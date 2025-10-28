<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-8"
  >
    <Toast
      v-if="toast"
      :message="toast.message"
      :type="toast.type"
      @close="toast = null"
    />

    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 mb-4">
          <div
            class="bg-linear-to-br from-blue-600 to-purple-600 p-2 rounded-lg"
          >
            <Ticket class="w-8 h-8 text-white" />
          </div>
          <span
            class="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            TicketFlow
          </span>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-2">
          {{ mode === "login" ? "Welcome Back" : "Create Account" }}
        </h2>
        <p class="text-gray-600">
          {{
            mode === "login"
              ? "Sign in to your account"
              : "Sign up to get started"
          }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name (Signup only) -->
        <div v-if="mode === 'signup'">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            v-model="formData.name"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="John Doe"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            v-model="formData.email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="you@example.com"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="formData.password"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Password must be at least 6 characters"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform cursor-pointer"
        >
          {{ mode === "login" ? "Login" : "Sign Up" }}
        </button>
      </form>

      <!-- Switch Mode -->
      <p class="text-center mt-6 text-gray-600">
        {{
          mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "
        }}
        <button
          @click="onNavigate(mode === 'login' ? 'signup' : 'login')"
          class="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
        >
          {{ mode === "login" ? "Sign Up" : "Login" }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { Eye, EyeOff, Ticket } from "lucide-vue-next";
import Toast from "./Toast.vue";

const props = defineProps({
  mode: String,
  onNavigate: Function,
  onAuth: Function,
});

const formData = ref({
  email: "",
  password: "",
  name: "",
});

const showPassword = ref(false);
const errors = ref({});
const toast = ref(null);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const validateForm = () => {
  const newErrors = {};
  if (!formData.value.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!formData.value.password) {
    newErrors.password = "Password is required";
  } else if (formData.value.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (props.mode === "signup" && !formData.value.name) {
    newErrors.name = "Name is required";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validateForm()) return;

  const token = "mock_token_" + Date.now();
  const userData = {
    email: formData.value.email,
    name: formData.value.name || formData.value.email,
  };

  localStorage.setItem(
    "ticketapp_session",
    JSON.stringify({ token, user: userData })
  );

  toast.value = {
    message: `${props.mode === "login" ? "Login" : "Signup"} successful!`,
    type: "success",
  };

  setTimeout(() => {
    props.onAuth && props.onAuth();
  }, 1000);
};
</script>
