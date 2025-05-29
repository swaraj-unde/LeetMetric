document.addEventListener("DOMContentLoaded",function(){


    const button = document.getElementById("button");
    const userin = document.getElementById("userinput");
    const easy = document.querySelector(".easy_prog");
    const medium = document.querySelector(".mid_prog");
    const hard = document.querySelector(".hard_prog");
    const easylab = document.getElementById("easy-label");
    const midlab = document.getElementById("mid-label");
    const hardlab = document.getElementById("hard-label");
    const stat = document.querySelector(".status_cards");
    const stats = document.querySelector(".stats");

    function validateuser(username){

        if(username.trim()==="")
        {
            alert("Enter Username First");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{3,15}$/;

        const ismatch = regex.test(username);

        if(!ismatch)
        {
            alert("Invalid Username");
        }
        return ismatch;

    }

    function putdata(user){

        stats.style.display = `flex`;

        const etot = user.totalEasy;
        const esol = user.easySolved;
        const mtot = user.totalMedium;
        const msol = user.mediumSolved;
        const htot = user.totalHard;
        const hsol = user.hardSolved;

        const proge = (esol * 100) / etot;
        const progm = (msol * 100) / mtot;
        const progh = (hsol * 100) / htot;

        easy.style.setProperty("--prog",`${proge}%`)
        medium.style.setProperty("--prog", `${progm}%`);
        hard.style.setProperty("--prog", `${progh}%`);

        easylab.textContent = `${esol} / ${etot}`;
        midlab.textContent = `${msol} / ${mtot}`;
        hardlab.textContent = `${hsol} / ${htot}`;


    }

    async function fetchuser(username) {
      const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
      try {
        button.textContent = "Wait";
        button.disabled = true;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Unable to Find User");
        }
        const user = await response.json();
        console.log("The Data :", user);

        if (user.errors!=null) {
          throw new Error("Unable to Find User");
          return;
        }

        putdata(user);

      } catch (error) {
        stats.style.display = `flex`;
        stat.innerHTML = `<p>No Data Found</p>`;
      } finally {
        button.textContent = "Search";
        button.disabled = false;
      }
    }

    function clearstats(){
        stat.innerHTML = ``;
        easy.style.setProperty("--prog", `0%`);
        medium.style.setProperty("--prog", `0%`);
        hard.style.setProperty("--prog", `0%`);

        easylab.textContent = ``;
        midlab.textContent = ``;
        hardlab.textContent = ``;


        stats.style.display = `none`;


    }

    button.addEventListener('click',function(){
        const username = userin.value;
        console.log(username);


        clearstats();

        if(validateuser(username))
        {
            fetchuser(username);
        }
    })
})