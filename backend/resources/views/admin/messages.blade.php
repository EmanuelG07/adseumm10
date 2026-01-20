<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Berichten') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            @if(session('success'))
                <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span class="block sm:inline">{{ session('success') }}</span>
                </div>
            @endif

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    
                    @if($messages->isEmpty())
                        <p class="text-gray-500 text-center py-8">Geen berichten gevonden.</p>
                    @else
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-left text-sm font-light">
                                <thead class="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">Datum</th>
                                        <th scope="col" class="px-6 py-4">Naam</th>
                                        <th scope="col" class="px-6 py-4">Email</th>
                                        <th scope="col" class="px-6 py-4">Bericht</th>
                                        <th scope="col" class="px-6 py-4">Actie</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($messages as $msg)
                                        <tr class="border-b dark:border-neutral-500 hover:bg-gray-50">
                                            <td class="whitespace-nowrap px-6 py-4 text-gray-500">{{ $msg->created_at->format('d-m-Y H:i') }}</td>
                                            <td class="whitespace-nowrap px-6 py-4 font-medium">{{ $msg->name ?? '-' }}</td>
                                            <td class="whitespace-nowrap px-6 py-4 text-blue-600">
                                                <a href="mailto:{{ $msg->email }}">{{ $msg->email }}</a>
                                            </td>
                                            <td class="px-6 py-4 max-w-xs truncate" title="{{ $msg->message }}">
                                                {{ $msg->message }}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                <form action="{{ route('messages.destroy', $msg->id) }}" method="POST" class="inline-block">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" 
                                                            class="text-red-500 hover:text-red-700 font-bold"
                                                            onclick="return confirm('Weet je zeker dat je dit bericht wilt verwijderen?')">
                                                        Verwijderen
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @endif

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
