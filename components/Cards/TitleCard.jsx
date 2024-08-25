import Subtitle from "../Typography/Subtitle";

function TitleCard({ title, children, topMargin, TopSideButtons }) {
  return (
    <div
      className={
        "w-full h-[400px] p-6 text-white bg-gray-800 bg-opacity-5 rounded-lg shadow-xl backdrop-filter border-2 border-gray-700 backdrop-blur-sm"
      }>
      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div className='inline-block float-right'>{TopSideButtons}</div>
        )}
      </Subtitle>

      <div className='divider mt-2'></div>

      {/** Card Body */}
      <div className='h-full w-full pb-6 text-white'>{children}</div>
    </div>
  );
}

export default TitleCard;
