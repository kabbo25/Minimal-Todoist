import appImg from "../../assets/images/MeditatingDoodle.png";
import purple from "../../assets/images/purple.png";
import green from "../../assets/images/green.png";
import red from "../../assets/images/red.png";
import blue from "../../assets/images/blue.png";

const TaskFilter = ({setCurrentPage, setSelectedTag}) => {

    const handleTagClick = (e) => {
        setCurrentPage(1);
        const clickedTag = e.currentTarget.querySelector(".tagname").getAttribute("value");
        document.querySelectorAll(".tag-button").forEach((button) => {
            if (button !== e.currentTarget) {
                button.classList.remove("active");
            }
        });
        e.currentTarget.classList.toggle("active");
        setSelectedTag((prevSelectedTag) => (prevSelectedTag === clickedTag ? "" : clickedTag));
    };

return (
    <div className="col-md-2 pt-md-7">
        <div className="d-flex flex-md-column gap-md-4 gap-3 justify-content-center">
            <button
                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                onClick={(e) => handleTagClick(e)}
            >
                <img src={purple} className="tag" alt="" />
                <p value={"pending"} className="fs-5 tagname">
                    pending
                </p>
            </button>

            <button
                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                onClick={(e) => handleTagClick(e)}
            >
                <img src={red} className="tag" alt="" />
                <p value={"Running"} className="fs-5 tagname">
                    Running
                </p>
            </button>
            <button
                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                onClick={(e) => handleTagClick(e)}
            >
                <img src={green} className="tag" alt="" />
                <p value={"Completed"} className="fs-5 tagname">
                    Completed
                </p>
            </button>
            <button
                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                onClick={(e) => handleTagClick(e)}
            >
                <img src={blue} className="tag" alt="" />
                <p value={"other"} className="fs-5 tagname">
                    other
                </p>
            </button>
            <div className="d-none  d-lg-block">
                <img src={appImg} className="pt-5 w-100" alt="" />
            </div>
        </div>
    </div>
)
}

export default TaskFilter