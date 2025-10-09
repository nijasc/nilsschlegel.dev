import type { ComponentIcon, Icon } from "lucide-svelte";
import type { Component } from "svelte";

export interface Application {
    name: string;
    component: Component;
    icon: any;
}