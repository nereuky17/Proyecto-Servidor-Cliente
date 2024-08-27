<template>
    <div>
      <h1>Bienvenido</h1>
     
    </div>


  <main>

<RouterView />
</main>
  </template>
  
  <style scoped>
  nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369b74;
  }
  </style>
  