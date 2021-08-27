const loadData = async () => {
    const name = document.getElementById('input').value.toLowerCase();
    if (name == '') {
        alert("No Input! Please input a team name.");
    }
    else {
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${name}`;
        const res = await fetch(url);
        const data = await res.json();
        displayData(data);
    }
    document.getElementById('input').value = '';
}

const displayData = data => {
    const teams = data.teams;
    // console.log(teams);
    const parentDiv = document.getElementById('parent');
    parentDiv.innerHTML = '';
    teams.forEach(team => {
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('text-center');
        div.style.border = "2px solid #fff";
        div.style.padding = "20px 20px";
        div.innerHTML = `
            <img width="100px" src="${team.strTeamBadge}" />
            <h3>${team.strTeam}</h3>
            <h5>${team.strLeague}</h5>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadTeamDetail(${team.idTeam})" class="btn btn-danger">See Information</button>
        `
        parentDiv.appendChild(div);
    })
}

const loadTeamDetail = async teamId => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailLeague(data);
}

const displayDetailLeague = data => {
    const { strTeam, strLeague, strTeamBadge, strStadiumDescription, strCountry } = data.teams[0];
    const header = document.getElementById('header');
    const body = document.getElementById('body');
    const footer = document.getElementById('footer');

    header.innerHTML = `
        <div>
            <h2 class="modal-title" id="exampleModalLabel">${strTeam}</h2>
            <p>${strLeague}</p>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `
    body.innerHTML = `
        <img width="100px" src="${strTeamBadge}" />
        <p>${strStadiumDescription}</p>
    `
    footer.innerHTML = `
        <p>Country: ${strCountry}</p>
    `
}