<?php declare(strict_types=1);
use GuzzleHttp\Client;

final readonly class BitlyShortener
{
    private Client $client;

    public function __construct(public string $token)
    {
        $this->client = new Client(["base_uri" => "https://api-ssl.bitly.com",]);
    }


    public function shortenUrl(string $longUrl): ?string
    {
        try {
            $response = $this->client->request("POST", "/v4/shorten", ["json" => ["long_url" => $longUrl,],
                "headers" => [
                    "Authorization" => "Bearer $this->token",
                    "Content-Type: application/json"
                ]]);

            if (!in_array($response->getStatusCode(), [200, 201])) {
                return null;
            }
            $payload = $response->getBody()->getContents();
            $payload = json_decode($payload);

            return $payload->link;
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        return null;
    }
}