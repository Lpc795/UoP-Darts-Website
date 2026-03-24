async function loadPosts() {
  const response = await fetch("posts.json");
  const data = await response.json();

  const container = document.getElementById("insta-feed");

  data.posts.forEach(url => {
      const wrapper = document.createElement("section");
      wrapper.className = "insta-wrapper";

      const block = document.createElement("blockquote");
      block.className = "instagram-media";
      block.setAttribute("data-instgrm-permalink", url);
      block.setAttribute("data-instgrm-version", "14");

      wrapper.appendChild(block);
      container.appendChild(wrapper);
  });


  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }
}

loadPosts();
