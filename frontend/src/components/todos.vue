<template>
   <li>{{ todo.text }}</li>
</template>

<script>
export default {
  name: 'TODOS',
  props:['todo']
}
</script>
