import BlogItem from "./BlogItem";

const BlogList = (props) => {
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {/* <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={"bg-black text-white py-1 px-4 rounded-sm"}
        >
          Lifestyle
        </button> */}
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {props.post.map((item, index) => {
          return (
            <BlogItem
              key={index}
              slug={item.slug}
              image={item.coverImage}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
