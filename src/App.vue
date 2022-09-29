<template>
  <router-view />
</template>

<style>
  @import url(./assets/base.css);
  body {
    padding: 0;
    margin: 0;
  }

  :root {
    --light-gray: #efefef;
    --dark-gray: #e3e2e2;
    --c-block: #222222;
    --c-body: #1c1c1e;
    --c-text: #c9cbd0;
    --c-base: #242426;
    --c-accent: #7373fa;
    --c-hover: #323639;
    --с-accent-dark: rgb(53, 48, 48);
    --c-underline: #28d2236f;
    --c-border: rgba(80, 80, 80, 0.3);
  }

  button {
    color: var(--c-text);
    border-radius: 10px;
    background-color: var(--c-accent);
    border: 1px var(--c-border) solid;
  }

  button:hover {
    border-color: rgba(137, 137, 137, 0.3);
  }

  body {
    background-color: var(--c-body);
  }

  input[type="text"] {
    background-color: var(--c-accent);
    border: 1px solid var(--c-border);
    border-radius: 10px;
    height: 40px;
  }

  summary {
    position: relative;
    list-style: none;
  }

  summary::before {
    content: "\25B6";
    position: absolute;
    right: 10px;
    border-top: 2px var(--c-border) solid;
    border-right: 2px var(--c-border) solid;
    transform: translate(0, -2px) rotate(135deg);
    margin-top: 14px;
    color: rgba(0, 0, 0, 0);
    height: 10px;
    width: 10px;
    transition: 0.2s;
    /* position: absolute;
    
    float: right;
    transform: rotate(45deg);
    
    color: rgba(0, 0, 0, 0);
    border-top: 2px var(--c-border) solid;
    border-right: 2px var(--c-border) solid;
    margin-top: 13px;
    right: 10px;
    background-repeat: no-repeat; */
  }

  details[open] > summary::before {
    content: "\25B6";
    position: absolute;
    right: 10px;
    border-top: 2px var(--c-border) solid;
    border-right: 2px var(--c-border) solid;
    transform: rotate(45deg);
    margin-top: 14px;
    color: rgba(0, 0, 0, 0);
    height: 10px;
    width: 10px;
  }

  summary::-webkit-details-marker {
    display: none;
  }
</style>
