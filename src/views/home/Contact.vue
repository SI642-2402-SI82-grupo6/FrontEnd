<script setup>
import { ref } from 'vue';
import { zodResolver } from '@primeuix/forms/resolvers/zod';
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { z } from "zod";
import emailjs from 'emailjs-com';

// Configura EmailJS con tu clave pública
emailjs.init('O1qyUPoayWOglpDDu'); // Reemplaza con tu User ID

const initialValues = {
  name: '',
  email: '',
  message: ''
};

const resolver = zodResolver(
    z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address').min(1, 'Email is required'),
      message: z.string().min(1, 'Message is required')
    })
);

const name = ref('');
const email = ref('');
const message = ref('');

const handleContactSubmit = async () => {
  const data = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  try {
    // Enviar correo a través de EmailJS
    await emailjs.send('service_vq4byxn', 'template_82dusii', data);
    alert('Message sent successfully!');
    // Limpiar los campos después del envío
    name.value = '';
    email.value = '';
    message.value = '';
  } catch (error) {
    console.error('Error during contact submission:', error);
    alert('Failed to send message');
  }
};
</script>

<template>
  <div class="contact-container">
    <h2>Contact Us</h2>
    <div class="flex flex-column row-gap-6">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="name" placeholder="Name" class="input-field"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-envelope"></i>
        </InputGroupAddon>
        <InputText v-model="email" placeholder="Email" class="input-field"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-comment"></i>
        </InputGroupAddon>
        <Textarea v-model="message" placeholder="Your message" rows="5" class="input-field"/>
      </InputGroup>
      <Button type="submit" label="SEND MESSAGE" @click="handleContactSubmit" class="contact-btn"/>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  padding: 20px;
  max-width: 400px;
  margin: auto;
}

.input-field {
  width: 100%;
}

.contact-btn {
  margin-top: 10px;
}
</style>
