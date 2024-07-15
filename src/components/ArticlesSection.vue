<template>
  <section class="articles">
    <div class="articles__wrapper">
      <div class="articles__header">
        <h4>
          Articles
        </h4>
        <ButtonComponent
          type="link"
          color="dark"
          label="More Articles"
        />
      </div>
      <div class="articles__body">
        <div class="article__items">
          <div
            class="article__item"
            v-for="(article, index) in articles"
            :key="index"
          >
            <div
              class="article__image"
              :style="{ backgroundImage: `url(${article.image})` }"
            />
            <p
              class="article__title"
              v-text="article.title"
            />
            <ButtonComponent
              type="link"
              color="dark"
              :label="article.link.text"
              class="article__link"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonComponent from "@/components/ButtonComponent.vue";
import ArticleImage from '@/assets/articles';

const ArticlesSection = defineComponent({
  components: {
    ButtonComponent,
  },
  setup() {
    const articles = [
      { image: ArticleImage.Article1, title: '7 ways to decor your home', link: { src: '/', text: 'Read more' } },
      { image: ArticleImage.Article2, title: 'Kitchen organization', link: { src: '/', text: 'Read more' } },
      { image: ArticleImage.Article3, title: 'Decor your bedroom', link: { src: '/', text: 'Read more' } },
    ]

    return {
      articles,
    }
  },
});

export default ArticlesSection;
</script>
