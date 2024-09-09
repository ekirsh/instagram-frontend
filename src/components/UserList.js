import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from './UserCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Select from 'react-select';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortOption, setSortOption] = useState('change_in_notable_followers_week');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const usersPerPage = 21;

  useEffect(() => {
    // Provide your array of usernames here
    const usernamesArray = [
      { value: 'conor', label: 'Conor Ambrose' },
      { value: 'coreygoldglit', label: 'Corey Goldglit' },
      { value: 'benz', label: 'Andre Benz' },
      { value: 'ben.icio', label: 'Benicio' },
      { value: 'avcantor', label: 'Av Cantor' },
      { value: 'imranmajid', label: 'Imran Majid' },
      { value: 'mattgeffen', label: 'Matt Geffen' },
      { value: 'georgemereu', label: 'George Mereu' },
      { value: 'danielstehr', label: 'Daniel Stehr' },
      { value: 'anr_eddie', label: 'ANR Eddie' },
      { value: 'federicomorris', label: 'Federico Morris' },
      { value: 'bennybrisk', label: 'Benny Brisk' },
      { value: 'sam_moreland', label: 'Sam Moreland' },
      { value: 'jacobzl', label: 'Jacob ZL' },
      { value: 'edson.moi', label: 'Edson Moi' },
      { value: 'bourneindie', label: 'Dylan Bourne ' },
      { value: 'iamladell', label: 'Brennen Ladell' },
      { value: 'tyler.henry', label: 'Tyler Henry' },
      { value: 'hannahbayschuck', label: 'Hannah Bayschuck' },
      { value: 'brymontesano', label: 'Bry Montesano' },
      { value: 'brennenwhaley_', label: 'Brennen Whaley' },
      { value: 'thetaztaylor', label: 'Taz Taylor' },
      { value: 'haroldweiser', label: 'Harold Weiser' },
      { value: 'thegoldenboyhicks', label: 'Jonathan Hicks' },
      { value: 'jamiliooo', label: 'Jamil Davis' },
      { value: 'aaronareid', label: 'Aaron Reid' },
      { value: 'aidantheasset', label: 'Aidantheasset' },
      { value: 'pipedrms', label: 'Felipe Favela' },
      { value: 'jeffreybvaughn', label: 'Jeffrey B. Vaughn' },
      { value: 'tom4sg', label: 'tom4sg' },
      { value: 'matthewnadler', label: 'Matthew Nadler' },
      { value: 'dannybersco', label: 'Danny Bersco' },
      { value: 'eren.aydogmus', label: 'Eren Aydogmus' },
      { value: 'itssmelvin', label: 'itssmelvinn' },
      { value: 'whartonberg', label: 'Orlando Wharton' },
      { value: 'dallah', label: 'Sarah Abdallah' },
      { value: 'avichezshaw', label: 'Avi Chez Shaw' },
      { value: 'jaebrwn', label: 'Jae Brown' },
      { value: 'whereisjg', label: 'whereisjg' },
      { value: 'willcramer', label: 'Will Cramer' },
      { value: 'pantsconley', label: 'Grant Conley' },
      { value: 'the_benaissance', label: 'Ben Locke' },
      { value: 'midwestnikki', label: 'Midwest Nikki' },
      { value: 'amin_kartoum', label: 'Amin Kartoum' },
      { value: 'kwammm_', label: 'Kwammm_' },
      { value: 'harrychongg', label: 'Harry Chongg' },
      { value: 'seansharkey', label: 'Sean Sharkey' },
      { value: 'zachhorowitz1', label: 'Zach Horowitz' },
      { value: 'arabbitshole', label: 'A Rabbits Hole' },
      { value: 'nate.fenn', label: 'Nate Fenn' },
      { value: 'jackson_harris', label: 'Jackson Harris' },
      { value: 'margielewis', label: 'Margie Lewis' },
      { value: 'jakecaramanno', label: 'Jake Caramanno' },
      { value: 'jacksteindorf', label: 'Jack Steindorf' },
      { value: 'nikizahedi', label: 'Niki Zahedi' },
      { value: 'dailychiefers', label: 'Daily Chiefers' },
      { value: 'atlee_g', label: 'Atlee G' },
      { value: 'justbeingct', label: 'Chris Turner' },
      { value: 'andfriends.nyc', label: 'And Friends NYC' },
      { value: 'ktoarshan', label: 'ktoarshan' },
      { value: 'kidstakeover', label: 'Kids Take Over' },
      { value: 'jacobrgilliland', label: 'Jacob Gilliland' },
      { value: 'thatsblakeg', label: 'Blake Goldman' },
      { value: 'luca5m', label: 'Lucas Martinez' },
      { value: 'polobearjord', label: 'polobearjord' },
      { value: 'trixxfe', label: 'Kyle Miller' },
      { value: 'dannyjacobson__', label: 'Danny Jacobson' },
      { value: 'carterfife', label: 'Carter Fife' },
      { value: 'pj_walshe', label: 'PJ Walshe' },
      { value: 'jarynvaldry', label: 'Jaryn Valdry' },
      { value: 'mateodorado', label: 'Mateo Dorado' }
    ];
       

    setFilterOptions(usernamesArray);
    fetchUsers(true);
  }, [sortOption, selectedFilters]);

  const fetchUsers = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get('https://server-wsrz.onrender.com/instagram', {
        params: {
          page: reset ? 1 : page,
          limit: usersPerPage,
          sort: sortOption,
          filter: selectedFilters.map(filter => filter.value).join(',')
        },
      });

      const newUsers = response.data;
      console.log(page);
      console.log(newUsers);
      console.log(hasMore);
      console.log(loading);

      if (reset) {
        setUsers(newUsers);
        setPage(2);
      } else {
        setUsers((prevUsers) => {
          const uniqueUsers = [...prevUsers, ...newUsers].filter(
            (user, index, self) =>
              index === self.findIndex((u) => u.id === user.id)
          );
          return uniqueUsers;
        });
        setPage((prevPage) => prevPage + 1);
      }

      setHasMore(newUsers.length === usersPerPage);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setPage(1);
    setUsers([]);
    setHasMore(true);
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
    console.log(selectedOptions)
    setPage(1);
    setUsers([]);
    setHasMore(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-10">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border rounded mx-2"
        >
          <option value="change_in_notable_followers_week">
            Change in Notable Followers (Week)
          </option>
          <option value="change_in_notable_followers_month">
            Change in Notable Followers (Month)
          </option>
          <option value="notable_followers">Total Notable Followers</option>
          <option value="first_date_tracked">First Date Tracked</option>
        </select>
        <div className="mx-2 w-64">
          <Select
            isMulti
            value={selectedFilters}
            onChange={handleFilterChange}
            options={filterOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Filter by Username"
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchUsers}
        hasMore={hasMore}
        loader={<div className="text-center">Loading...</div>}
        endMessage={<div className="text-center">No more users to display</div>}
      >
        <div className="">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1200: 3, 1400: 4 }}>
            <Masonry className="my-masonry">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UserList;
