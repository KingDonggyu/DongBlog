import { useState, useEffect, useRef, useMemo } from "react";

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = (posts, selectedTag, selectedCategory) => {
  const containerRef = useRef(null);
  const observer = useRef(null);
  const [count, setCount] = useState(1);

  const postListData = useMemo(
    () =>
      selectedCategory !== "All"
        ? posts.filter(
            ({
              node: {
                frontmatter: { category },
              },
            }) => (category === selectedCategory ? true : false)
          )
        : posts.filter(
            ({
              node: {
                frontmatter: { tags },
              },
            }) => (selectedTag !== "All" ? tags.includes(selectedTag) : true)
          ),
    [selectedCategory, selectedTag]
  );

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return; // 화면에 노출되었는지 확인
      setCount((value) => value + 1);
      observer.unobserve(entries[0].target); // 관측중인 객체만 관측 중지
    });
  }, []);

  // 카테고리나 태그 선택이 변경된 경우 count 값 1로 변경
  useEffect(() => setCount(1), [selectedCategory, selectedTag]);

  // 더 불러올 데이터가 있는지 확인한 후, 조건을 충족하면 선택한 요소의 맨 마지막 자식 노드 관측
  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListData.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0 ||
      observer.current === null
    )
      return;

    observer.observe(
      containerRef.current.children[containerRef.current.children.length - 1]
    );
  }, [count, selectedCategory, selectedTag]);

  return {
    containerRef,
    postList: postListData.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
