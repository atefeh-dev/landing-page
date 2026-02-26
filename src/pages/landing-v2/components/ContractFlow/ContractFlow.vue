<template>
  <div class="cf">
    <!-- Base steps — swap with fade -->
    <Transition name="cf-fade" mode="out-in">
      <StepTemplates
        v-if="step === 'templates'"
        key="templates"
        @next="onTemplateSelected"
      />
      <StepForm
        v-else
        key="form"
        :template-id="templateId"
        @next="onFormDone"
        @back="goTo('templates', `zoonkan.com/templates/`)"
      />
    </Transition>

    <!-- Modal overlay — email, otp, success all layer on top of form -->
    <Transition name="cf-modal">
      <div v-if="modal" class="cf__overlay" @click.self="() => {}">
        <div class="cf__modal-wrap">
          <Transition name="cf-modal-swap" mode="out-in">
            <StepEmail
              v-if="modal === 'email'"
              key="email"
              @next="onEmailDone"
            />
            <StepOtp
              v-else-if="modal === 'otp'"
              key="otp"
              :email="email"
              @next="onOtpDone"
              @resend="onResend"
            />
            <StepSuccess
              v-else-if="modal === 'success'"
              key="success"
              :template-id="templateId"
              @close="reset"
            />
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StepTemplates from "./StepTemplates.vue";
import StepForm from "./StepForm.vue";
import StepEmail from "./StepEmail.vue";
import StepOtp from "./StepOtp.vue";
import StepSuccess from "./StepSuccess.vue";

const emit = defineEmits(["url-change"]);

// "step" controls the background (templates | form)
// "modal" controls the overlay (null | email | otp | success)
const step = ref("templates");
const modal = ref(null);
const templateId = ref("NDA");
const email = ref("");

function emitUrl(url) {
  emit("url-change", url);
}

function goTo(newStep, url) {
  step.value = newStep;
  modal.value = null;
  emitUrl(url);
}

function onTemplateSelected(id) {
  templateId.value = id;
  step.value = "form";
  emitUrl(`zoonkan.com/ccreate/${id}`);
}

function onFormDone() {
  modal.value = "email";
  emitUrl(`zoonkan.com/create/${templateId.value}/send`);
}

function onEmailDone(val) {
  email.value = val;
  modal.value = "otp";
  emitUrl(`zoonkan.com/create/${templateId.value}/confirm`);
}

function onOtpDone() {
  modal.value = "success";
  emitUrl(`zoonkan.com/create/${templateId.value}/success`);
}

function onResend() {}

function reset() {
  templateId.value = "NDA";
  email.value = "";
  modal.value = null;
  step.value = "templates";
  emitUrl("zoonkan.com/templates/");
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

// The outer shell — fills the BrowserMockup body, centers everything
.cf {
  width: 100%;
  height: 100%;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

// ── Forward transition ─────────────────────────────────────────────
.cf-forward-enter-active,
.cf-forward-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  // Step components must not be block-level inside flex — keep them inline-flex
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cf-forward-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.cf-forward-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

// ── Back transition ────────────────────────────────────────────────
.cf-back-enter-active,
.cf-back-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cf-back-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.cf-back-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
// ── Modal overlay ─────────────────────────────────────────────────
.cf__overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: rgba(52, 64, 84, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: rem(24);
}

.cf__modal-wrap {
  width: 100%;
  max-width: rem(400);
  position: relative;
}
</style>
