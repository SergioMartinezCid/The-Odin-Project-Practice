const getHomepage = () => {
    const div_homepage = document.createElement('div');
    const headline = document.createElement('h1');
    const img = document.createElement('img');
    const div_body = document.createElement('div');

    headline.innerText = "Restaurant Webpage";
    img.src = "../assets/restaurant.jpg";
    div_body.innerText = "The food was exceptionally good, as was the service. And such good value we went back a couple " + 
        "more times during our holiday, and will book a window seat next time we visit Tenerife. Highly recommended.";

    div_homepage.appendChild(headline);
    div_homepage.appendChild(img);
    div_homepage.appendChild(div_body);

    return div_homepage;
}

export {getHomepage};