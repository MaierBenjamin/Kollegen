<script>

</script>

<template>
    <div class="top-bar">
        <div class="logo">
            <img src="@/assets/handshake.svg" alt="logo">
        </div>
        <div class="form-group">
            <input
            id="search"
            v-model="search"
            placeholder="Search"
          />
          <button><img src="@/assets/search.svg" alt=""></button>
        </div>
        <div class="profilpicture"><img src="@/assets/sigma.webp" alt=""></div>
    </div>
</template>


<style>
.top-bar {
    display: flex;
    flex-direction: row;
    align-items: center;           
    justify-content: space-between; 
    width: 100%;
    padding: 0 20px;              
    background-color: #6264a7;
    box-sizing: border-box;
}

.logo img {
    width: 60px;
    height: 60px;
    object-fit: cover;
}

.form-group {
    flex: 1;                       
    display: flex;
    justify-content: center;      
}

.form-group {
    label {
        display: block;
        margin-bottom: 8px;
        font-size: 16px;
    }

    input {
        width: 50%;
        padding: 14px 18px;
        border-radius: 20px;
        border: none;
        background: #f3f3f3;
        font-size: 16px;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
    }
}

.profilpicture img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

</style>