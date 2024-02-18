---
title: Learning Eleventy
order: 4
tags: ["posts"]
layout: "layouts/post.njk"
permalink: /blog/first-practice-post/index.html
---

Looks like another good tool to learn and add to the never ending list of tools to learn.

{% image "./meme.jpg", "An amusing meme" %}
{%- css %}{% include "public/css/practice.css" %}{% endcss %}

<div id="carouselExampleIndicators" class="carousel slide mb-3">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://res.cloudinary.com/cloudinary-h/image/upload/v1706963434/cg-eleventy-blog/hola.jpg" class="d-block w-100" alt="Greeting 'Hello' in Spanish displayed on a sign">
    </div>
    <div class="carousel-item">
      <img src="https://res.cloudinary.com/cloudinary-h/image/upload/v1706963434/cg-eleventy-blog/hello.jpg" class="d-block w-100" alt="Greeting 'Hello' in English displayed on a sign">
    </div>
    <div class="carousel-item">
      <img src="https://res.cloudinary.com/cloudinary-h/image/upload/v1706964130/cg-eleventy-blog/welcome.jpg" class="d-block w-100" alt="Greeting 'Welcome' in English displayed on a sign">
    </div>
	<div class="carousel-item">
      <img src="https://res.cloudinary.com/cloudinary-h/image/upload/v1706964130/cg-eleventy-blog/howdy.jpg" class="d-block w-100" alt="Greeting 'Howdy' in English displayed on a sign">
    </div>
	<div class="carousel-item">
      <img src="https://res.cloudinary.com/cloudinary-h/image/upload/v1706964130/cg-eleventy-blog/hello-one.jpg" class="d-block w-100" alt="Greeting 'Hello' in English displayed on a sign">
    </div>
	<div class="carousel-item">
      <img src="https://res.cloudinary.com/cloudinary-h/image/upload/v1706964130/cg-eleventy-blog/love.jpg" class="d-block w-100" alt="Inspirational quote saying 'Do what you love'">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<section class="d-flex flex-column">
	<div class="dummy-articles">
		<div>
			<article class="h-100 p-5 text-light bg-success bg-gradient rounded-3">
				<h2 class="mb-2">Dog pics!</h2>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tempora repellendus consequuntur explicabo! Nesciunt, beatae, delectus mollitia sed accusamus!</p>
				<button class="btn btn-outline-light" type="button" id="open-modal-2" data-type="modal-dialog-centered" data-title="This is from the 2nd button with the green background">Click me!</button>
			</article>
		</div>
		<div>
			<article class="h-100 p-5 bg-warning border rounded-3">
				<h2 class="mb-2">Nasa stuff</h2>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tempora repellendus consequuntur explicabo! Nesciunt, beatae, delectus mollitia sed accusamus!</p>
				<button class="btn btn-outline-dark" type="button" id="open-modal-3" data-type="modal-fullscreen" data-title="This is from the 3rd button with the yellow background">Click me!</button>
			</article>
		</div>
	</div>

    <div class="p-4 rounded-3 border border-2">
    	<article class="container-fluid py-5">
    		<h2 class="display-5 fw-bold">Cool quotes!</h2>
    		<p class="col-12 fs-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tempora repellendus consequuntur explicabo! Nesciunt, beatae, delectus mollitia sed accusamus quam error aperiam itaque suscipit alias recusandae!</p>
    		<button class="btn btn-primary btn-lg" type="button" id="open-modal-4" data-type="modal-lg" data-title="This is from the 4th button with no background">Click me!</button>
    	</article>
    </div>

</section>
