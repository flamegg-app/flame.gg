import DashboardLayout from '../../components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-6 max-w-2xl">
        <section className="bg-[#161616] border border-neutral-800 p-8 rounded-2xl">
          <h3 className="font-bold mb-6">Profile Information</h3>
          <div className="space-y-4">
            <SettingInput label="Display Name" placeholder="pyre" />
            <SettingInput label="Avatar URL" placeholder="https://..." />
            <SettingInput label="Description" placeholder="A short tagline" />
            <div>
               <label className="text-xs font-bold text-neutral-500 uppercase block mb-2">Bio</label>
               <textarea 
                className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 rounded-xl text-sm min-h-[100px] outline-none focus:border-purple-600"
                placeholder="Tell people about yourself..."
               />
            </div>
            <button className="bg-purple-600 px-6 py-2 rounded-lg font-bold text-sm">Save Changes</button>
          </div>
        </section>

        <section className="bg-[#161616] border border-neutral-800 p-8 rounded-2xl border-red-900/20">
          <h3 className="font-bold text-red-500 mb-2">Danger Zone</h3>
          <p className="text-xs text-neutral-500 mb-4">Deleting your account is permanent and cannot be undone.</p>
          <button className="bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/20 px-6 py-2 rounded-lg font-bold text-sm transition">
            Delete Account
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}

function SettingInput({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-bold text-neutral-500 uppercase block mb-2">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 rounded-xl text-sm outline-none focus:border-purple-600"
      />
    </div>
  );
}