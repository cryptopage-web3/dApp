<template>
  <div class="post-bottom">
    <div class="post-like-dis">
      <a href="#" class="post-like">
        <img src="@/assets/img/post-like_img1.png" alt="" />
        <span> 0 </span>
      </a>
      <a href="#" class="post-dis">
        <img src="@/assets/img/post-like_img2.png" alt="" />
        <span> 0 </span>
      </a>
    </div>
    <div class="post-comment">
      <form>
        <div class="post-comment-wr">
          <input
            type="text"
            placeholder="Your comment text"
            class="post-comment__input"
          />
          <button class="post-comment__btn">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {}
</script>
