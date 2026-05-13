

function Footer() {
  return (
    <div>
   <div class="w-full">
 
  <div class="flex w-full flex-col gap-4">
    <div class="mb-4 flex items-center gap-4">
      <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div class="flex flex-col gap-4">
        <div class="skeleton h-4 w-52"></div>
        <div class="skeleton h-4 w-52"></div>
      </div>
    </div>
    <div class="skeleton mb-4 h-32 w-full"></div>
  </div>
  
  <footer class="footer bg-base-200/60 items-center rounded-t-box px-6 py-4 shadow-base-300/20 shadow-sm">
    <aside class="grid-flow-col items-center">
      <p>©2024 <a class="link link-hover font-medium" href="#">FlyonUI</a></p>
    </aside>
    <nav class="text-base-content grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a class="link link-hover" href="#">License</a>
      <a class="link link-hover" href="#">Help</a>
      <a class="link link-hover" href="#">Contact</a>
      <a class="link link-hover" href="#">Policy</a>
    </nav>
  </footer>
</div>
    </div>
  )
}

export default Footer
