import React from 'react';
import Link from 'next/link';

type Stat = { number: string; label: string; color: string };
interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat, index) => {
      let href = '';
      switch (stat.label) {
        case 'Profile Visits':
          href = '/profiles/profile-visits';
          break;
        case 'Shortlisted Profiles':
          href = '/profiles/shortlisted-profiles';
          break;
        case 'Horoscope Matches':
          href = '/profiles/horoscope-matches';
          break;
        case 'Nearby Matches':
          href = '/profiles/nearby-matches';
          break;
        default:
          href = '#';
      }
      return (
        <Link key={index} href={href} className="block">
          <div className={`bg-white rounded-2xl p-6 shadow-xl text-center hover:shadow-md transition-shadow cursor-pointer h-40 w-50`}>
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} text-2xl font-bold mb-3`}>
              {stat.number}
            </div>
            <p className="text-xl text-[#000000] font-medium font-Lato">{stat.label}</p>
          </div>
        </Link>
      );
    })}
  </div>
);

export default StatsSection; 