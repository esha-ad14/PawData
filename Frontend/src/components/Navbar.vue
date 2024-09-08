<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
</script>

<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="max-w-9xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block md:hidden h-12 w-auto"
              src="https://images.assetsdelivery.com/compings_v2/alekseyvanin/alekseyvanin1705/alekseyvanin170500759.jpg"
            />
            <img
              class="hidden lg:block h-12 w-auto"
              src="https://images.assetsdelivery.com/compings_v2/alekseyvanin/alekseyvanin1705/alekseyvanin170500759.jpg"
            />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!--Navigation Bar-->
            <router-link
              to="/"
              class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 focus:border-brown-20 focus:text-brown-10 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >Home</router-link
            >
            <router-link
              to="/Dogs"
              class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 focus:border-brown-20 focus:text-brown-10 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >Dogs</router-link
            >
            <router-link
              to="/Commands"
              class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 focus:border-brown-20 focus:text-brown-10 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >Commands</router-link
            >
            <router-link
              to="/Experience"
              class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 focus:border-brown-20 focus:text-brown-10 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >Experience</router-link
            >
            <router-link
              to="/Trainers"
              class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 focus:border-brown-20 focus:text-brown-10 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >Trainers</router-link
            >
            <router-link
              to="/Customers"
              class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 focus:border-brown-20 focus:text-brown-10 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >Customers</router-link
            >
          </div>
        </div>

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        ></div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-4 space-y-1">
        <!-- Mobile size menu options -->
        <DisclosureButton
          as="a"
          href="/"
          class="border-brown-20 text-brown-10 block pl-3 pr-4 py-1 border-l-4 text-base font-medium"
          >Home</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/Dogs"
          class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 block pl-3 pr-4 py-1 border-l-4 text-base font-medium"
          >Dogs</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/Commands"
          class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 block pl-3 pr-4 py-1 border-l-4 text-base font-medium"
          >Commands</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/Experience"
          class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 block pl-3 pr-4 py-1 border-l-4 text-base font-medium"
          >Experience</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/Trainers"
          class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 block pl-3 pr-4 py-1 border-l-4 text-base font-medium"
          >Trainers</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/Customers"
          class="border-transparent text-gray-400 hover:border-brown-20 hover:text-brown-10 block pl-3 pr-4 py-1 border-l-4 text-base font-medium"
          >Customers</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
