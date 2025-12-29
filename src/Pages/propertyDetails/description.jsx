import React from "react";
import Skeleton from "react-loading-skeleton";

const Description = ({ data, loading }) => {
  const des =
    data?.content && Array.isArray(data.content) && data.content.length > 0
      ? data.content
      : null;

  return (
    <div>
      <div className="blog-info details mb-30">
        <p class="productdetails_heading mb-4">Description</p>
        {loading ? (
          <>
             <Skeleton height={300} />
          </>
        ) : (
          <>
            {des?.map((item) => {
              return (
                <div className="">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              );
            })}
          </>
        )}
        
      </div>
    </div>
  );
};

export default Description;
