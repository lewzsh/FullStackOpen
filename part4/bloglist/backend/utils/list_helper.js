var _ = require('lodash')

const totalLikes = (blogs) => {
    let total = 0
    for (const b of blogs) {
        total += b.likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let mostFaves = 0
    let fave = {}
    for (const b of blogs) {
        if (b.likes > mostFaves) {
            mostFaves = b.likes
            fave = { title: b.title, author: b.author, likes: b.likes }
        }
    }
    return fave
}

const mostBlogs = (blogs) => {
    const count = _.countBy(blogs, (b) => b.author)
    return _.maxBy(Object.keys(count), author => count[author])
}

const mostLikes = (blogs) => {
    const authorLikes = _.groupBy(blogs, (b) => b.author)
    const authorTotals = _.mapValues(authorLikes, (author) => {
        return _.sumBy(author, (b) => b.likes)
    })
    const authorWithMost = _.maxBy(Object.keys(authorTotals), author => authorTotals[author])
    return { author: authorWithMost, likes: authorTotals[authorWithMost] }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}