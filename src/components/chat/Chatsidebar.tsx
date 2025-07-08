
type User = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
 userId: string | number;
};

interface ChatSidebarProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUser: User;
}

export default function ChatSidebar({ users, onSelectUser }: ChatSidebarProps) {
  return (
    <div className="w-1/3 h-full border-r overflow-y-auto bg-white border-red-500">
      <h2 className="text-xl fixed bg-white w-[500px] font-bold p-4">Messages</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="flex items-center gap-3 rounded-2xl px-10 py-10 hover:bg-gray-100 cursor-pointer mt-10  border-2 shadow-2xl"
          >
            <img src={user.avatar} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
