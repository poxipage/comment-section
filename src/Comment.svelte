<script lang="ts">

export let comment: {name: string, comment: string, date: Date}

let now = new Date()

const timeEstimate = (date1: Date, date2: Date) => {
    const time = (date1.getTime() - date2.getTime())/1000
    return time < 60 ? "Less than a minute ago" 
    : time < 3600 ? Math.floor(time/60) + "minutes ago" 
    : time < 86400 ? Math.floor(time/3600) + "hours ago" 
    : time < 2592000 ? Math.floor(time/86400) + "days ago"
    : time < 31104000 ? Math.floor(time/2592000) + "months ago"
    : Math.floor(time/31104000) + "years ago"
}

$: time = timeEstimate(now, comment.date)
</script>

<div class="w-full border-2 border-black mt-5">
    <p>{comment.name}</p>
    <p>{comment.comment}</p>
    <p>{time}</p>
</div>

<style>
</style>