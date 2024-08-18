const imgPlusIcon = "/assets/images/icon-minus.svg";
const imgMinusIcon = "/assets/images/icon-plus.svg";

function accordionClose(button, accordionBody) {
    button.classList.remove("active");
    accordionBody.style.maxHeight = "0px";
    accordionBody.style.paddingBottom = "0px";
    button.querySelector("img").src = imgMinusIcon;
}

function accordionOpen(button, accordionBody) {
    button.classList.add("active");
    accordionBody.style.maxHeight = `${accordionBody.scrollHeight}px`
    button.querySelector("img").src = imgPlusIcon;
}

document.addEventListener("DOMContentLoaded", () => {
    let accordionNodes = document.querySelectorAll(".accordion");

    accordionNodes.forEach((accordion) => {
        let accordionBody = accordion.querySelector(".accordion-body")
        let button = accordion.querySelector(".accordion-head button");

        // Reset the accordion icon and max-height values 
        if (button.classList.contains("active")) {
            button.querySelector("img").src = imgPlusIcon;
            accordionBody.style.paddingBottom = "10px";
            accordionBody.style.maxHeight = `${accordionBody.scrollHeight}px`;
        } else {
            button.querySelector("img").src = imgMinusIcon;
            accordionBody.style.paddingBottom = "0px";
            accordionBody.style.maxHeight = "0px";
        }

        // Capture "other" accordions
        let otherAccordionNodes = Array.from(accordionNodes).filter((otherAccordion) => {
            return otherAccordion !== accordion;
        });

        // Add event listener for the accordion buttons
        button.addEventListener("click", function () {
            accordionCallback(this, accordionBody, otherAccordionNodes)
        })
    });

    function accordionCallback(button, accordionBody, otherAccordionNodes) {
        if (button.classList.contains("active")) {
            accordionClose(button, accordionBody)
        } else {
            accordionOpen(button, accordionBody)
            otherAccordionNodes.forEach((accordion) => {
                accordionClose(
                    accordion.querySelector(".accordion-head button"),
                    accordion.querySelector(".accordion-body"),
                )
            })
        }
        // button.classList.toggle("active")
    }
});