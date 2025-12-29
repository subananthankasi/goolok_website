export const truncateContent = (content, limit) => {
    return content.length > limit ? content.slice(0, limit) + "..." : content;
  };