<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Foto beheer') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            {{-- Success message --}}
            @if(session('success'))
                <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span class="block sm:inline">{{ session('success') }}</span>
                </div>
            @endif

            {{-- Validation Errors --}}
            @if($errors->any())
                <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong class="font-bold">Er ging iets fout!</strong>
                    <ul class="mt-1 list-disc list-inside text-sm">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {{-- Upload Form --}}
                <div class="md:col-span-1">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Nieuwe foto uploaden</h3>
                        
                        <form action="{{ route('photos.store') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="photo">
                                    Kies bestand
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                       id="photo" type="file" name="photo" required>
                                <p class="text-xs text-gray-500 mt-1">JPG, PNG of WebP (max 5MB)</p>
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                                    Titel (optioneel)
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                       id="title" type="text" name="title" placeholder="Bijv. Project X">
                            </div>

                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="alt">
                                    Alt tekst (optioneel)
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                       id="alt" type="text" name="alt" placeholder="Omschrijving voor schermlezers">
                            </div>

                            <button class="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition" type="submit">
                                Uploaden
                            </button>
                        </form>
                    </div>
                </div>

                {{-- Photo Grid --}}
                <div class="md:col-span-2">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Geüploade foto's ({{ $photos->count() }})</h3>
                        
                        @if($photos->count() === 0)
                            <p class="text-gray-500">Nog geen foto's geüpload.</p>
                        @else
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                @foreach($photos as $photo)
                                    <div class="relative group bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                                        <div class="aspect-square bg-gray-200 relative">
                                            <img src="{{ asset('storage/' . $photo->path) }}" 
                                                 alt="{{ $photo->alt }}" 
                                                 class="w-full h-full object-cover">
                                            
                                            {{-- Delete Button (Absolute Top Right) --}}
                                            <form action="{{ route('photos.destroy', $photo) }}" method="POST" class="absolute top-2 right-2">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" 
                                                        class="bg-red-600 text-white rounded-full p-2 shadow-lg hover:bg-red-700 transition transform hover:scale-110"
                                                        title="Verwijderen"
                                                        onclick="return confirm('Weet je zeker dat je deze foto wilt verwijderen?')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>
                                        
                                        <div class="p-3">
                                            <p class="font-semibold text-sm text-gray-800 truncate" title="{{ $photo->title }}">
                                                {{ $photo->title ?? 'Naamloos' }}
                                            </p>
                                            <p class="text-xs text-gray-500 mt-1">ID: {{ $photo->id }}</p>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                    </div>
                </div>

            </div>
        </div>
    </div>
</x-app-layout>
