<script lang="ts">
    import { onMount } from "svelte";
    import Comment from "./Comment.svelte";

    
let comments = [{name: "Anna", comment:"Generic comment", date: new Date("2022-11-01")}, {name: "Peter", comment:"Cool story bro", date: new Date("2020-03-25")}]

let captchaText;
let ctx;

let userText = "";
let userName = "";
let comment = "";

let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let c = ""

$: isCaptchaCorrect = userText === c
$: borderColor = isCaptchaCorrect ? "border-green-400 border-2" : ""



const createCaptcha = () => {
    c = ""
    for (let i = 0; i < 7; i++) {
        c += alphaNums[Math.floor(Math.random() * alphaNums.length)];
    }
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    ctx.fillText(c, 5, captchaText.height/2);

}


onMount(() => {
    ctx = captchaText.getContext("2d");
    ctx.font = "30px Roboto";
    ctx.fillStyle = "#08e5ff";
    createCaptcha()
})

const addComment = () => {
  if (isCaptchaCorrect && userName.length > 0) {
    comments = [{name: userName, comment: comment, date: new Date()}, ...comments]
    userName = "";
    userText = "";
    comment = "";
    createCaptcha()
  }
}

</script>

<h1>Add comment</h1>
<div class="mb-2">
  <input class="border-2 border-black" type="text" placeholder="Name"  bind:value={userName}>
</div>
<div>
  <textarea class="border-2 border-black" placeholder="Write your comment here" bind:value={comment} name="comment" id="comment" cols="60" rows="6"></textarea>
</div>
<div class="flex justify-between">
  <div>
    <canvas width="200px" height="45px" bind:this={captchaText} />
    <button on:click={createCaptcha} class="border-2 rounded bg-slate-50">Refresh captcha</button>
  </div>
  <div>
    <p>Enter the letters</p>
    <input bind:value={userText} type="text" name="captcha" class="{borderColor}">
  </div>       
</div>
<button class="mt-4 border-2 rounded bg-slate-50" on:click={addComment}>Add comment</button>

{#each comments as comment}
  <Comment {comment} />
{/each}
<style>
</style>
