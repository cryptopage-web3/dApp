import axios from 'axios'
import { METADATA_SERVICE_API_URL } from '~/constants'
import { BaseService } from '~/services/BaseService'
import { Web3Service } from '~/services/Web3Service'
import { authModule } from '~/utils/storeAccessor'

const metaDataAxios = axios.create()
metaDataAxios.defaults.baseURL = METADATA_SERVICE_API_URL

export class MetadataService extends BaseService {
  protected api = metaDataAxios;

  uploadFileToIPFS = async (file: File, isEncrypted: boolean): Promise<string> => {
    const formData = new FormData()
    formData.set('file', file)
    formData.set('isEncrypted', JSON.stringify(isEncrypted))

    const response = await this.post(
      'uploadIpfsObject',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data as string
  }

  // for now works only with images
  decryptIpfsFile = async (postId: string) => {
    const web3Service = new Web3Service(authModule.provider)

    // do not change message content (it should match message value in lambda)
    const message = 'View encoded post'
    const account = authModule.address

    return await new Promise<string>((resolve, reject) => {
      web3Service.web3.eth.personal.sign(message, account, 'password', (error, signature) => {
        if (error) {
          console.error(error)
        } else {
          this.get(
            'decryptIpfsObject',
            {
              params: {
                postId,
                signature
              },
              responseType: 'blob'
            }
          )
            .then((response) => {
              const reader = new FileReader()
              reader.onloadend = () => {
                // const image = new Image()
                // image.src = reader.result as string

                // const w = window.open('') as Window
                // w.document.write(image.outerHTML)
                // w.document.title = 'Decrypted Content'

                resolve(reader.result as string)
              }
              reader.readAsDataURL(response.data as Blob)
            })
            .catch(reject)
        }
      })
    })
  }
}
