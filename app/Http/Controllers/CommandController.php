<?php

namespace App\Http\Controllers;

use App\Models\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class CommandController extends Controller
{
    //
    public function index()
    {
        return response()->json(
            ["commands" => Command::all()]
        );

    }

    public function store(Request $request)
    {
        ;

    }
    public function storeCsv()
    {
        $commands = Command::all();
        $csvFile = base_path('/app/Http/Controllers/data/Commands.csv');

        $file = fopen($csvFile, 'w');

        // Check if there are any commands to write
        if ($commands->isEmpty()) {
            fclose($file);
            return response()->json(['message' => 'No data to write to CSV.']);
        }

        // Write the header
        fputcsv($file, array_keys($commands->first()->toArray()));

        // Write each command
        foreach ($commands as $command) {
            fputcsv($file, $command->toArray());
        }

        fclose($file);

        return response()->json(['message' => 'Data written to CSV successfully.']);
    }

    public function readCsv()
    {
        $csvFile = base_path('/app/Http/Controllers/data/Commands.csv');


        if (!File::exists($csvFile)) {
            return response()->json(['message' => 'CSV file does not exist.'], 404);
        }

        $file = fopen($csvFile, 'r');

        $header = null;
        $data = [];

        while (($row = fgetcsv($file)) !== false) {
            if ($header === null) {
                $header = $row;
            } else {
                $data[] = array_combine($header, $row);
            }
        }

        fclose($file);

        return response()->json($data);
    }
}
