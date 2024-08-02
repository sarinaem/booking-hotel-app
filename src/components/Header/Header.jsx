import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus } from "react-icons/hi";
import {HiSearch} from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
function Header() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  console.log(searchParams.get("destination"));
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })

  const [date, setDate] = useState([{
    startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
  }]);

  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
     return {
      ...prev,
      [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,

     } 
    })
  }


  const handleSearch = () => {
    // navigate("./hotels");
    // setSearchParams({date, options, destination});
    const encodeParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options)
    });
    //note= setSearchParams(encodeParams);
    // navigate("./hotels");
    navigate({
      pathname: "./hotels",
      search: encodeParams.toString()
    });


  };

  
  return (
    <div className="header">
      <a href="">Home</a>
      <div className="headerSearch">
          <div className="headerSearchItem">
            <MdLocationOn className="locationIcon headerIcon" />
            <input type="text" 
             name="destination" 
             id="destination"
            placeholder="where to go?" 
            className="headerSearchInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            />
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon"/>
          <div className="dateDropDown" onClick={() => {
            setOpenDate(!openDate);
          }}> 
              {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(date[0].endDate, "MM/dd/yyy")}`}
           </div>  
              {openDate && <DateRange onChange={(item) => setDate([item.selection])} 
               ranges={date} 
               minDate={new Date()}
               moveRangeOnFirstSelection={true}
               className="date"/>}

            <span className="seperator"></span>
             </div>
          <div className="headerSearchItem">
            <div id="optionDropDown" onClick={() => {
            setOpenOption(!openOption);
          }}>
                {options.adult}adult &bull; {options.children} children &bull; {options.room} room
            </div>
            {openOption && <GuestOptionList 
            options={options} 
            setOpenOption={setOpenOption}
            handleOptions={handleOptions}/>}
            <span className="seperator"></span>

          </div>
          <div className="headerSearchItem">
            <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon"/>
            


            
            </button>
          </div>
      </div>
      
    </div>
  )
}

export default Header;



function GuestOptionList({ options, handleOptions, setOpenOption }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOption(false));
  return <div className="guestOptions"  ref={optionRef}>
  <OptionItem handleOptions={handleOptions} 
  type="adult" options={options} minLimit={1}/>
  <OptionItem handleOptions={handleOptions} 
  type="children" options={options} minLimit={0}/>
  <OptionItem 
  handleOptions={handleOptions} 
  type="room" 
  options={options} 
  minLimit={1}/>
 </div>
}



function OptionItem({options, type, minLimit, handleOptions}) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
        onClick={() => handleOptions(type, "dec")}
        className="optionCounterBtn"
        disabled={options[type] <= minLimit}>
          <HiMinus className="icon"/>
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
         onClick={() => handleOptions(type, "inc")}
        className="optionCounterBtn">
          <HiPlus className="icon"/>

        </button>

      </div>
    </div>
  )
}