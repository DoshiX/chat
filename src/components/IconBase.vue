<template>
    <svg xmlns="http://www.w3.org/2000/svg" 
      :width="width" 
      :height="height" 
      viewBox="0 0 24 24" 
      :aria-labelledby="iconName" 
      role="presentation"
    >
        
        <g :fill="iconColor">
            <component :is="ICONS[iconName]"></component>
        </g>
    </svg>
  </template>
  
<script setup>
import ICONS from '@/components/icons';

defineProps ({
	iconName: {
		type: String,
		default: 'box',
	},
	width: {
		type: [Number, String],
		default: 24,
	},
	height: {
		type: [Number, String],
		default: 24,
	},
	iconColor: {
		type: String,
		default: 'currentColor',
	},
});
</script>
  
<style scoped>
svg {
    display: inline-block;
    vertical-align: baseline;
}
</style>
