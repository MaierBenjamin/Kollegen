<script>
import { ref } from 'vue';

const searchtext = ref(''); 

function onPFPClick() {
    router.push('/account');
}

</script>
 
<template>
    <div class="top-bar">
        <div class="logo">
            <router-link to="/" class="logo">
            <img src="@/assets/handshake.svg" alt="">
            </router-link>
            
        </div>
        <div class="form-group">
            <input
            id="search"
            v-model="searchtext"
            placeholder="Search"
          />
        </div>
        <router-link to="/account" class="profilpicture">
            <img src="@/assets/sigma.webp" alt="">
        </router-link>
    </div>
</template> 


<style lang="scss" scoped>
.top-bar {
    display: flex;
    flex-direction: row;
    align-items: center;          
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;       
    height: 70px;       
    background-color: var(--background);
    box-sizing: border-box;
    top: 0;
    border-bottom: 1px solid white;
}

.logo img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
 
.form-group {
    flex: 1;                      
    display: flex;
    justify-content: center; 

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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.profilpicture  {
    background: none;
    border: none;
    cursor: pointer;
}

</style>