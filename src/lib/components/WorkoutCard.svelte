<script>
export let isFresh;
</script>


{#if isFresh}
<div class="card">

    <label for="cars">Choose a car:</label>
    <select name="cars" id="cars">
      <optgroup label="Swedish Cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
      </optgroup>
      <optgroup label="German Cars">
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </optgroup>
    </select>


    <label for="tentacles">Number of tentacles (10-100):</label>

<input type="number" id="tentacles" name="tentacles"
       min="10" max="100">

       <label for="tentacles">Number of tentacles (10-100):</label>

<input type="number" id="tentacles" name="tentacles"
       min="10" max="100">

       <label for="tentacles">Number of tentacles (10-100):</label>

<input type="number" id="tentacles" name="tentacles"
       min="10" max="100">
    <!-- <i class="fa-solid fa-circle-plus rgtext"></i> -->

</div>
{:else}
<div class="card">empty</div>
{/if}


<style lang="scss">
    .card{
        margin: 1%;
        background-color: rgba($color: #000000, $alpha: .30);
        border-radius: 18px;
        width: 25vw;
        height: 25vh;
    }
</style>