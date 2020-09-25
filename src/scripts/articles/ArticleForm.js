// form presented to user to add news article

import { useArticles, saveArticle } from './ArticleProvider.js'

const eventHub = document.querySelector("body")

// share article functionality
eventHub.addEventListener("click", event => {
    if (event.target.id === "saveArticle") {

        const title = document.getElementById("input--title")
        const synopsis = document.getElementById("input--synopsis")
        const url = document.getElementById("input--url")

        if (title.value !== "" && synopsis.value !== "" && url.value !== "") {
            const newArticle = {
                title: title.value,
                date: Date.now(),
                synopsis: synopsis.value,
                url: url.value
            }

            saveArticle(newArticle)
        } else {
            window.alert("Please fill in all fields.")
        }
    }
})

// renders form
export const ArticleForm = () => {
    const contentTarget = document.getElementById("newsContainer")

    // note: full url required
    contentTarget.innerHTML += `
        <section id="formModal" class="modal">
            <form id="input--form" class="modal-content">
                <div id="input--header">
                    <h3 id="modalGreeting">Share an Article</h3>
                    <span id="modalClose">&times;</span>
                </div>

                <input type="hidden" name="articleId" id="articleId">

                <input type="text" id="input--title" placeholder="Title of the Article"></input>

                <textarea id="input--synopsis" placeholder="Please include a synopsis..." rows="10" cols="50"></textarea>

                <input type="text" id="input--url" placeholder="Copy/Paste URL of Article Here"></input>

                <button id="saveArticle" type="reset">Share</button>
            </form>
        </section>
    `
}

eventHub.addEventListener('editArticle', event => {
    const articleCollection = useArticles()

    console.log(event.detail.id)

    const articleToEdit = articleCollection.find(event.target.id === articleCollection.id)

    console.log(articleToEdit)
})