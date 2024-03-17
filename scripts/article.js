function loadArticle() {
    let params = new URL(window.location.href);
    let articleID = params.searchParams.get("articleID"); 

    db.collection("news").doc(articleID).get().then(article => {
        var title = article.id;
        var image = article.data().image;
        var content = article.data().content;

        document.querySelector("#title").innerHTML = title;
        document.querySelector("#image").setAttribute("src", image);
        document.querySelector("#content").innerHTML = content;
    })
}
loadArticle();