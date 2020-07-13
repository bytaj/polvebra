import assert from 'assert';
import {expect}  from 'chai';
import User from '../../main/user/domain/User';
import '../../main/shared/infrastructure/mongodb/database';
import AbstractFactory from '../../main/transaction/domain/AbstractFactory';
import { getPersistenceController } from '../../main/shared/application/PersistenceController';
import Tag from '../../main/tag/domain/Tag';





describe('CRUD User',  () => {
    const tagName1:string = "tagName1";
    const tagName2:string = "tagName2";
    const tagName3:string = "tagName3";
    const tagDescrition1:string = "tagDescrition1";
    const tagDescrition3:string = "tagDescrition3";
    const tagCreated1 = new Tag(tagName1, tagDescrition1);
    const tagCreated2 = new Tag(tagName2);
    const tagCreated3 = new Tag(tagName3, tagDescrition3);
    

    let tagSaved1:Tag

    it('User created in DB', async function () {
        try{
            let tagSaved = await getPersistenceController().getTagAdapter().createTag(tagCreated1);
            let idUser1 = tagSaved.getId();
            assert.ok(idUser1);
            assert.equal(tagCreated1, tagSaved);
        }catch(err){
            console.log(err);
            assert.fail();   
        }
    });

    after(()=>{
        getPersistenceController().getUserAdapter().removeUser(tagCreated1.getId());
        
    })
    
});
