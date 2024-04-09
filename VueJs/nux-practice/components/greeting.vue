<template>
    <div>
        <h1>
            Hello User, {{ greetingMsg }}
        </h1>
        <p>{{ content }}</p>
    </div>
</template>

<script>
export default {
    props: {
        greetingMsg: String, // Define greetingMsg prop
        content: String // Define content prop
    }
}
</script>
