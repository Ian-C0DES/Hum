<script>
// import QuickSearchBar from "svelte-quicksearch-bar@latest";
// import Search from "svelte-search";
</script>



<body>
    <div id="content">


<div class="panel">


        <div class="LeftContainer">

            <div class="searchContainer">
                <i class="fa-solid fa-magnifying-glass rgtext"></i>
                <input type="text" name="" id="" placeholder="Search here">
            </div>


        </div>

        <div class="RightContainer">
asd
        </div>


    </div>

    </div>
</body>



<style lang="scss">
    *{
        outline: 1px red solid;
        // color:var(--textcolor);
        // font-family: var(--font);
    }
    body {
        min-height: 100vh;
        overflow-x: hidden;
        background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
    }
    #content{
        margin-left: 8vw;
        max-width: 90vw;
        .panel{
            border-radius: 0px 0px 18px 18px;
            padding: .4rem;
            display: flex;
            justify-content: space-between;
            background-color: rgba($color: #000000, $alpha: .40);
        }
        .LeftContainer{
            border-radius: 18px 0px 0px 18px;
            padding: .5rem;
            display: flex;
            width: 50%;
            height: 95vh;
            background-color: rgba($color: #ffffff, $alpha: .1);
        }
        .RightContainer{
            border-radius: 0px 18px 18px 0px;
            padding: .5rem;
            width: 60%;
            height: 95vh;
            display: flex;
            background-color: rgba($color: #ffffff, $alpha: .1);

        }

         }
         .searchContainer{
            height: 10%;
            width: 100%;
        border-radius: 18px;
        display: flex;
        background-color: rgba($color: #000000, $alpha: .40);
        align-items: center;
        i{
            font-size: 3rem;
            padding: 1rem;
        }
        input{
            font-size: 2rem;
            background-color: transparent;
            color: var(--textcolor);
            outline: none;
            border: none;

        }

    }
</style>