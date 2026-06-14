class Ricetta {
    valutazione = null;
    constructor(nome, ingredienti, passaggi, tempoPreparazione, veggy, spicy, categoria){
        this.nome = nome;
        this.ingredienti = ingredienti;
        this.passaggi = passaggi;
        this.tempoPreparazione = tempoPreparazione;
        this.veggy = veggy;
        this.spicy = spicy;
        this.categoria = categoria;
    }

    getNome(){ return this.nome; }
    getIngredienti(){ return this.ingredienti; }
    getPassaggi(){ return this.passaggi; }
    getTempoPreparazione(){ return this.tempoPreparazione; }
    getVeggy(){ return this.veggy; }
    getSpicy(){ return this.spicy; }
    getCategoria(){ return this.categoria; }
    
    setValutazione(valutazione){
        if(valutazione < 1 || valutazione > 5){
            throw new Error("Valutazione deve essere compresa tra 1 e 5");
        }
        this.valutazione = valutazione;
    }
    getValutazione(){ return this.valutazione; }
}

class GestoreRicette {
    constructor(){
        const ricetteSalvate = localStorage.getItem("ricette");
        this.ricette = ricetteSalvate ? JSON.parse(ricetteSalvate) : [];
    }

    hasRecipe(nome){
        return this.ricette.some(recipe => recipe.nome.trim().toLowerCase() === nome.trim().toLowerCase());
    }

    aggiungiRicetta(nome, ingredienti, passaggi, tempoPreparazione, veggy, spicy, categoria){
        if(this.hasRecipe(nome)){
            throw new Error("Ricetta già esistente");
        }

        const nuovaRicetta = new Ricetta(nome, ingredienti, passaggi, tempoPreparazione, veggy, spicy, categoria);
        this.ricette.push(nuovaRicetta);
        this.salvaRicette();
        return nuovaRicetta;
    }

    // NUOVO: Elimina una ricetta cercando per nome
    rimuoviRicetta(nome) {
        this.ricette = this.ricette.filter(r => r.nome.toLowerCase() !== nome.toLowerCase());
        this.salvaRicette();
    }

    // NUOVO: Sostituisce i dati di una ricetta esistente
    aggiornaRicetta(nomeOriginale, nuoviDati) {
        const indice = this.ricette.findIndex(r => r.nome.toLowerCase() === nomeOriginale.toLowerCase());
        if (indice !== -1) {
            // Se cambia il nome e il nuovo nome esiste già (ed è diverso da quello vecchio), blocca
            if (nomeOriginale.toLowerCase() !== nuoviDati.nome.toLowerCase() && this.hasRecipe(nuoviDati.nome)) {
                throw new Error("Esiste già un'altra ricetta con questo nuovo nome!");
            }
            this.ricette[indice] = nuoviDati;
            this.salvaRicette();
        }
    }

    salvaRicette(){
        localStorage.setItem("ricette", JSON.stringify(this.ricette));
    }

    getTutteRicette(){
        return this.ricette;
    }
}