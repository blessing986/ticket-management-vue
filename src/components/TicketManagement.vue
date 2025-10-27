<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
    <!-- Toast -->
    <Toast
      v-if="toast"
      :message="toast.message"
      :type="toast.type"
      @close="toast = null"
    />

    <!-- Navbar -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2">
            <div
              class="bg-linear-to-br from-blue-600 to-purple-600 p-2 rounded-lg"
            >
              <TicketIcon class="w-6 h-6 text-white" />
            </div>
            <span
              class="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              TicketFlow
            </span>
          </div>

          <div class="flex items-center gap-4">
            <button
              @click="onNavigate('dashboard')"
              class="px-3 py-2 md:px-6 text-sm md:text-base text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Dashboard
            </button>
            <button
              @click="onLogout"
              class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 transform font-semibold cursor-pointer"
            >
              <LogOutIcon size="16" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800">Ticket Management</h2>
        <button
          @click="toggleForm"
          class="flex items-center gap-2 w-full md:w-auto px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform font-semibold cursor-pointer"
        >
          <PlusIcon size="20" />
          Create Ticket
        </button>
      </div>

      <!-- Form -->
      <div v-if="showForm" class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">
          {{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Title <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="formData.title"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p v-if="errors.title" class="text-red-500 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Description</label
            >
            <textarea
              v-model="formData.description"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            ></textarea>
            <p v-if="errors.description" class="text-red-500 text-sm mt-1">
              {{ errors.description }}
            </p>
          </div>

          <!-- Status & Priority -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <p v-if="errors.status" class="text-red-500 text-sm mt-1">
                {{ errors.status }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Priority</label
              >
              <select
                v-model="formData.priority"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <button
              type="submit"
              class="w-full md:w-auto px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform font-semibold cursor-pointer"
            >
              {{ editingTicket ? "Update Ticket" : "Create Ticket" }}
            </button>
            <button
              type="button"
              @click="cancelForm"
              class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Ticket List -->
      <div
        v-if="tickets.length === 0"
        class="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <p class="text-gray-500 text-lg">
          No tickets yet. Create your first ticket to get started!
        </p>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="text-xl font-bold text-gray-800 flex-1">
              {{ ticket.title }}
            </h4>
            <span
              :class="`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                ticket.status
              )}`"
            >
              {{ getStatusLabel(ticket.status) }}
            </span>
          </div>

          <p v-if="ticket.description" class="text-gray-600 mb-4 line-clamp-3">
            {{ ticket.description }}
          </p>

          <div class="flex items-center justify-between pt-4 border-t">
            <span class="text-sm text-gray-500"
              >Priority: {{ ticket.priority }}</span
            >
            <div class="flex gap-2">
              <button
                @click="handleEdit(ticket)"
                class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer"
              >
                <Edit2Icon size="16" />
              </button>
              <button
                @click="deleteConfirm = ticket.id"
                class="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer"
              >
                <Trash2Icon size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div
      v-if="deleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h3 class="text-2xl font-bold mb-4 text-gray-800">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete this ticket? This action cannot be
          undone.
        </p>
        <div class="flex gap-4">
          <button
            @click="handleDelete(deleteConfirm)"
            class="flex-1 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 transform"
          >
            Delete
          </button>
          <button
            @click="deleteConfirm = null"
            class="flex-1 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  PlusIcon,
  Edit2Icon,
  Trash2Icon,
  LogOutIcon,
  TicketIcon,
} from "lucide-vue-next";
import Toast from "./Toast.vue";
import Footer from "./Footer.vue";

// Props
defineProps({
  onNavigate: Function,
  onLogout: Function,
});

// State
const tickets = ref([]);
const showForm = ref(false);
const editingTicket = ref(null);
const deleteConfirm = ref(null);
const toast = ref(null);

const formData = ref({
  title: "",
  description: "",
  status: "open",
  priority: "medium",
});

const errors = ref({});

// Lifecycle
onMounted(() => {
  const stored = localStorage.getItem("tickets");
  if (stored) tickets.value = JSON.parse(stored);
});

// Helpers
const saveTickets = (newTickets) => {
  tickets.value = newTickets;
  localStorage.setItem("tickets", JSON.stringify(newTickets));
};

const validateForm = () => {
  const newErrors = {};
  if (!formData.value.title.trim()) newErrors.title = "Title is required";
  if (!formData.value.status) newErrors.status = "Status is required";
  if (!["open", "in_progress", "closed"].includes(formData.value.status))
    newErrors.status = "Invalid status";
  if (formData.value.description?.length > 500)
    newErrors.description = "Description must be less than 500 characters";
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validateForm()) {
    toast.value = { message: "Please fix the errors", type: "error" };
    return;
  }

  if (editingTicket.value) {
    const updated = tickets.value.map((t) =>
      t.id === editingTicket.value.id ? { ...formData.value, id: t.id } : t
    );
    saveTickets(updated);
    toast.value = { message: "Ticket updated successfully!", type: "success" };
  } else {
    const newTicket = { ...formData.value, id: Date.now() };
    saveTickets([...tickets.value, newTicket]);
    toast.value = { message: "Ticket created successfully!", type: "success" };
  }

  cancelForm();
};

const handleEdit = (ticket) => {
  editingTicket.value = ticket;
  formData.value = { ...ticket };
  showForm.value = true;
};

const handleDelete = (id) => {
  saveTickets(tickets.value.filter((t) => t.id !== id));
  toast.value = { message: "Ticket deleted successfully!", type: "success" };
  deleteConfirm.value = null;
};

const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-700";
    case "in_progress":
      return "bg-amber-100 text-amber-700";
    case "closed":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusLabel = (status) =>
  status === "in_progress"
    ? "In Progress"
    : status.charAt(0).toUpperCase() + status.slice(1);

const toggleForm = () => {
  showForm.value = !showForm.value;
  editingTicket.value = null;
  formData.value = {
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  };
};

const cancelForm = () => {
  showForm.value = false;
  editingTicket.value = null;
  formData.value = {
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  };
};
</script>
