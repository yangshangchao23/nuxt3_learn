<template>
<div>
  <header>
    <slot name="header">custom-layout默认header</slot>
  </header>
  <main>
    <slot />
  </main>
  <div class="footer">about和parent页面需要用到的页脚</div>
</div>
</template>